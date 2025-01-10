import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

// Add theme overrides here in the system config
const config = defineConfig({
    // Customize the variable per project acronym/shorthand
    cssVarsPrefix: 'datem',
    theme: {
        tokens: {
            fonts: {
                heading: { value: 'Outfit Variable' },
                body: { value: 'Outfit Variable' },
            },
        },
    },
});

// Extends the default system
const system = createSystem(defaultConfig, config);

export default system;
