type Props = {
  tag: string;
};

export function TagHeader({ tag }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        {tag}
      </h2>
    </section>
  )
}