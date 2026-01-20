import { useId } from "react";
import styles from "./GlassRadioGroup.module.css";

export type GlassOption = {
  label: string;
  value: string;
};

type GlassRadioGroupProps = {
  options: GlassOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
};

const GlassRadioGroup: React.FC<GlassRadioGroupProps> = ({
  options,
  value,
  onChange,
  name = "glass-radio-group",
}) => {
  const groupId = useId();

  return (
    <div
      className={styles.glassRadioGroup}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ ["--count" as any]: options.length } as React.CSSProperties}
    >
      {options.map((option) => {
        const id = `${groupId}-${option.value}`;

        return (
          <div key={option.value}>
            <input
              type="radio"
              id={id}
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label htmlFor={id}>{option.label}</label>
          </div>
        );
      })}

      <div
        className={styles.glassGlider}
        style={{
          transform: `translateX(${options.findIndex(
            (o) => o.value === value
          ) * 100}%)`,
        }}
      />
    </div>
  );
};

export default GlassRadioGroup;
