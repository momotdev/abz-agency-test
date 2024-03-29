import React from 'react';
import './styles/get-request-section.scss';
import BasicButton from '../BasicButton/BasicButton';
import UserCard from '../UserCard/UserCard';
import { useInfiniteQuery } from 'react-query';
import { fetchUsers } from '../../api/users';

const GetRequestSection = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(['users'], ({ pageParam }) => fetchUsers(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage.links.next_url ? { page: lastPage.page + 1 } : undefined;
    },
    refetchOnWindowFocus: false
  });

  return (
    <section className='section get-request-section'>
      <div className='get-request-section__title'>Working with GET request</div>
      <div className='get-request-section__list-wrapper'>
        {data?.pages
          .flatMap((page) => page.users)
          .toSorted((a, b) => b.registration_timestamp - a.registration_timestamp)
          .map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
      </div>
      <div className='get-request-section__button-wrapper'>
        {hasNextPage && <BasicButton onClick={() => fetchNextPage()}>Show More</BasicButton>}
      </div>
    </section>
  );
};

export default GetRequestSection;
