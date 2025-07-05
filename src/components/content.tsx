export default function Content({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-[calc(100vh-4rem)]" {...props}>
      {children}
    </section>
  )
}
