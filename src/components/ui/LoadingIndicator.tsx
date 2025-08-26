type Props = {
  size?: number;
  className?: string;
};

const LoadingIndicator = ({ size = 24, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 70 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Loading"
      role="img"
    >
      <circle fill="currentColor" cx="15" cy="25" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </circle>
      <circle fill="currentColor" cx="35" cy="25" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle fill="currentColor" cx="55" cy="25" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
    </svg>
  );
};

export default LoadingIndicator;
