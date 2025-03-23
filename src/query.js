import { gql } from "@apollo/client"

export const GET_CHARACTERS = gql`
    query ($page: Int, $filter: FilterCharacter){
        characters(page: $page, filter: $filter){
            info {
                next
            }
            results{
                id
                name
                status
                species
                gender
                origin {
                    name
                }
            }
        }
}`