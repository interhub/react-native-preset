import gql from 'graphql-tag'

export const GET_CHALLENGES_QUERY = gql`
  query {
    me {
      activeChallenges {
        edges {
          node {
            type
            title
            description
            globalProgress
            usersCount
            endDate
            startDate
            goal
            goalUnits
            bonusPoints
            pivot {
              progress
            }
            media {
              full_url
            }
          }
        }
      }
      passedChallenges {
        edges {
          node {
            type
            title
            description
            globalProgress
            usersCount
            goal
            endDate
            startDate
            goalUnits
            bonusPoints
            pivot {
              progress
            }
            media {
              full_url
            }
          }
        }
      }
    }
  }
`
