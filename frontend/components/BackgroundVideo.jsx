/**
 * Site background — deep-black / royal-purple geometric facets with fine gold edge lines.
 * (File name kept for the layout import; there is no video behind the pages any more.)
 */
export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 bg-ink">
      <img src="/media/images/bg-geo.webp" alt="" aria-hidden fetchPriority="low" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/70" />
    </div>
  );
}
