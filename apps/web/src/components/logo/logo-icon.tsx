import { Image, ImageProps } from '@chakra-ui/react';
import IconLogoPNG from '../../assets/icon.png';

export type LogoIconProps = Omit<ImageProps, 'src' | 'alt'>;

const LogoIcon = (props: LogoIconProps) => {
    const { ...rest } = props;

    return <Image src={IconLogoPNG} alt={'Logo icon'} {...rest} />;
};

export default LogoIcon;
