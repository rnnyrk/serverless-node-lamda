import { gql } from 'apollo-server-express';

export const QuestionnairesSchema = gql`
  type Question {
    id: String
    text: String
  }

  type Questionnaire {
    id: String
    name: String
    questions: [Question]
  }
`;
