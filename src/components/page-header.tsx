import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export default function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground md:text-xl">
        {description}
      </p>
    </div>
  );
}
