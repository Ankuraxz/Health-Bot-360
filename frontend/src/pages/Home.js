import React from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";

import {
  EditIcon,
  AddIcon,
  ExternalLinkIcon,
  ChatIcon,
  LockIcon,
  StarIcon,
} from "@chakra-ui/icons"; // Use available icons

function Features({ title, text, icon }) {
  return (
    <Stack>
      <Box
        p={7}
        borderWidth="2px"
        borderColor="blue.300"
        borderRadius="xl"
        boxShadow="xl"
        height="100%"
        bg="whitesmoke"
      >
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={"blue.400"}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={920}>{title}</Text>
        <Text color={"gray.600"}>{text}</Text>
      </Box>
    </Stack>
  );
}

export default function Home() {
  return (
    <Box p={75} marginTop={20}>
      <Text
        fontWeight="bold"
        fontSize="xl"
        color="black"
        textAlign="center" // Center align the text
        marginLeft="auto" // Shift towards the margin (right-aligned)
        marginRight="auto" // Shift towards the margin (left-aligned)
        mb={5}
      >
        Features of Our Website - HealthBot 360
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={90}>
        <Features
          icon={<Icon as={EditIcon} w={10} h={10} />}
          title={"Personal Health Profile"}
          text={
            "Create and manage your personalized health profile with key information like height, weight, blood pressure, and allergies. Your health data is securely stored, ensuring that our recommendations are tailored just for you."
          }
        />
        <Features
          icon={<Icon as={AddIcon} w={10} h={10} />}
          title={"Hassle-Free Document Upload"}
          text={
            "Say goodbye to tedious manual data entry. Upload your health insurance documents, such as policy papers, effortlessly. Our system will extract and organize the essential details for you."
          }
        />
        <Features
          icon={<Icon as={ExternalLinkIcon} w={10} h={10} />}
          title={"AI-Powered Understanding"}
          text={
            "Harness the power of AI with our advanced Embedding Model, converting text data into vectors, and ChromaDB for semantic search. This ensures that our responses are not just accurate but also context-aware, making complex insurance jargon easy to comprehend."
          }
        />
        <Features
          icon={<Icon as={ChatIcon} w={10} h={10} />}
          title={"Conversational AI Assistance"}
          text={
            "Get answers to your health insurance queries with the help of our cutting-edge Conversational Model powered by GPT-3.5 Turbo. It understands your context and provides natural, human-like responses for a seamless user experience."
          }
        />
        <Features
          icon={<Icon as={LockIcon} w={10} h={10} />}
          title={"Data Privacy and Security"}
          text={
            "Your data privacy is our top priority. We adhere to the highest standards of security and data protection, ensuring that your sensitive health information remains confidential and safe."
          }
        />
        <Features
          icon={<Icon as={StarIcon} w={10} h={10} />}
          title={"Customized Health Insurance Insights"}
          text={
            "Access a wealth of information about your health insurance. Our app combines your personal data, extracted information from your insurance documents, and AI intelligence to offer personalized insights and recommendations."
          }
        />
      </SimpleGrid>
    </Box>
  );
}
