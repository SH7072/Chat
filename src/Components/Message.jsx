import React from 'react'
import { VStack, HStack, Avatar, Text } from '@chakra-ui/react'
const Message = ({ text, uri, user = "other" }) => {
    return (



        < HStack bg={'yellow.50'} borderRadius={"base"} alignSelf={user==="me"? "flex-end": "flex-start  "} paddingX={"2"} paddingY={"1"}  >

            {user === "other" &&
                <Avatar src={uri} />
            }
            <Text>
                {text}
            </Text>
            {user === "me" &&
                <Avatar src={uri} />
            }

        </HStack >





    )
}

export default Message