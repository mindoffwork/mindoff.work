type TagProps = {
  label: string;
};

const tagClassName =
  "font- inline-flex items-center rounded-full border-normal border-rule bg-panel px-3 py-1 text-size-sm text-muted";

export function Tag({ label }: TagProps) {
  return (
    <span className={tagClassName}>{label}</span>
  );
}
