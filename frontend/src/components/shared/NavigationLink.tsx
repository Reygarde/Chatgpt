import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      to={props.to}
      className="border-magic-button"
    >
      <span className="border-magic-effect" />
      <span className="border-magic-content">
        {props.text}
      </span>
    </Link>
  );
};

export default NavigationLink;
