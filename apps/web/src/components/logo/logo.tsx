import { Image, ImageProps } from '@chakra-ui/react';
import LogoPNG from '../../assets/logo.png';

export type LogoProps = Omit<ImageProps, 'src' | 'alt'>;

const Logo = (props: LogoProps) => {
    const { ...rest } = props;

    return <Image src={LogoPNG} alt={'Logo'} {...rest} />;
};

export default Logo;
