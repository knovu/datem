import { Box, HStack, List, Separator, Spacer, Text, VStack } from '@chakra-ui/react';
import { Logo } from '@src/components/logo';
import { cx, dt } from '@src/utils';
import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';

const LayoutSideBar = () => {
    const [selectedListItem, setSelectedMenuItem] = useState<string>();

    return (
        <Box
            className={cx('layout-content')}
            data-testid={dt('layout-content')}
            w={'300px'}
            h={'100%'}
            bgColor={'gray.100'}
            borderRightWidth={1}>
            <VStack w="100%" h="100%">
                <List.Root>
                    <List.Item value={'DOGGGGGGGGGGGGGG'} as={HStack} gap={0}>
                        <List.Indicator asChild color="green.500">
                            <GoDotFill />
                        </List.Indicator>
                        Dashboard
                    </List.Item>
                    <List.Item as={HStack} gap={0}>
                        <List.Indicator asChild color="green.500">
                            <GoDotFill />
                        </List.Indicator>
                        Dashboard
                    </List.Item>
                </List.Root>

                <Separator w="75%" />

                <Spacer flex={1} />

                <HStack
                    bgColor={'gray.100'}
                    h={50}
                    gap={5}
                    borderTopWidth={1}
                    w="100%"
                    justify={'center'}>
                    <Logo w={100} />
                    <Text fontSize={14} color={'gray.400'}>
                        Version: 0.0.1
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
};

export default LayoutSideBar;
