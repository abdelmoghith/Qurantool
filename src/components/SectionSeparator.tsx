const SectionSeparator = () => {
  return (
    <div className="relative w-full py-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border/30"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="flex items-center">
          <div className="h-1 w-16 bg-primary/20 rounded-full"></div>
          <div className="mx-2 h-2 w-2 bg-primary rounded-full"></div>
          <div className="h-1 w-16 bg-primary/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionSeparator;