type Props = {
  title: string
}
export default function PageHeader({ title }: Props) {
  return (
    <div className="bg-[url('/img/components/ui/PageHeader/bg.svg')] bg-cover bg-repeat bg-bottom px-4 py-16 lg:py-32">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">{title}</h1>
    </div>
  )
}