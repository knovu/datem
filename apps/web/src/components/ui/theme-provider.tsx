import { PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import UI from './ui';
import system from './system';

export type ThemeProviderProps = PropsWithChildren;

const ThemeProvider = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <ChakraProvider value={system}>
            {/* Bootstrap recipes */}
            <UI />
            {children}
        </ChakraProvider>
    );
};

export default ThemeProvider;
