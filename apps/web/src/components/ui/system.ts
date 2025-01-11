import { createSystem, defineConfig, defaultConfig, defineRecipe } from '@chakra-ui/react';

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
        recipes: {
            button: defineRecipe({
                base: {
                    borderRadius: 'lg',
                },
            }),
        },
    },
});

// Extends the default system
const system = createSystem(defaultConfig, config);

export default system;
