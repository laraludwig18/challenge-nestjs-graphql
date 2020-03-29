import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Container, Message } from './styles';

const GET_ALL_MESSAGES = gql`
  query {
    getMessages {
      id
      content
      user {
        email
      }
    }
  }
`;

interface IMessage {
  id: number;
  content: string;
  user: {
    email: string;
  };
}

export default function Board() {
  const { loading, data } = useQuery<{ getMessages: IMessage[] }>(
    GET_ALL_MESSAGES
  );

  if (loading) return <p>Loading ...</p>;

  return (
    <Container>
      {data?.getMessages.map(item => (
        <Message key={item.id}>
          <p>{item.content}</p>

          <span>{item.user.email}</span>
        </Message>
      ))}
    </Container>
  );
}
