import * as icons from '@/assets/icons';

type TIcons = keyof typeof icons;

type IconProps = {
  name: TIcons;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...props} />;
};

export { Icon, type TIcons };
