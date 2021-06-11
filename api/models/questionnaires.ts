import { gql } from 'apollo-server-express';

export const QuestionnairesSchema = gql`
  type Question {
    id: ID!
    text: String!
  }

  type Questionnaire {
    id: ID!
    title: String
    questions: [Question]
  }

  type Query {
    listQuestionnaires: [Questionnaire]
  }

  input QuestionInput {
    text: String!
  }

  type Mutation {
    createQuestionnaire(title: String!, questions: [QuestionInput]): Questionnaire
  },
`;
