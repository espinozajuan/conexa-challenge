import { EpisodeListProps } from "./EpisodeList.types";

export default function EpisodeList({ episodes, title }: EpisodeListProps) {
  const hasScroll = episodes.length > 8;

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-black">{title}</h3>
        {episodes.length > 0 && (
          <span className="text-sm text-gray-500">
            {episodes.length} episodio{episodes.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {episodes.length === 0 ? (
        <p className="text-black text-center py-8">
          No hay episodios para mostrar
        </p>
      ) : (
        <div className="relative">
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2 pb-4">
            {episodes.map((episode) => (
              <div key={episode.id} className="text-sm text-black">
                <span className="font-medium">{episode.episode}</span>
                <span className="mx-2">-</span>
                <span>{episode.name}</span>
                <span className="mx-2">-</span>
                <span className="text-gray-500">{episode.air_date}</span>
              </div>
            ))}
          </div>
          {hasScroll && (
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>
          )}
        </div>
      )}
    </div>
  );
}
