interface Props {

  stats: {

    repoName: string;

    totalChunks: number;

    totalFiles: number;

    primaryLanguage: string;

    framework: string;

    detectedTechnologies: string[];

  };

}

export default function RepositoryDashboard({
  stats,
}: Props) {

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-5
        gap-5
        mb-8
      "
    >

      <DashboardCard
        title="Repository"
        value={stats.repoName}
      />

      <DashboardCard
        title="Files"
        value={stats.totalFiles}
      />

      <DashboardCard
        title="Chunks"
        value={stats.totalChunks}
      />

      <DashboardCard
        title="Language"
        value={stats.primaryLanguage}
      />

      <DashboardCard
        title="Framework"
        value={stats.framework}
      />

      <div
        className="
          md:col-span-2
          xl:col-span-5
          p-6
          rounded-3xl
          bg-white/5
          border
          border-white/10
        "
      >

        <h3
          className="
            text-white
            font-semibold
            mb-4
          "
        >
          Detected Technologies
        </h3>

        <div className="flex flex-wrap gap-3">

          {stats.detectedTechnologies.map(
            (tech, index) => (

              <div
                key={index}
                className="
                  px-4
                  py-2
                  rounded-2xl
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  text-blue-300
                  text-sm
                "
              >

                {tech}

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {

  return (

    <div
      className="
        p-6
        rounded-3xl
        bg-white/5
        border
        border-white/10
      "
    >

      <p
        className="
          text-zinc-400
          text-sm
          mb-2
        "
      >
        {title}
      </p>

      <h2
        className="
          text-white
          text-2xl
          font-bold
        "
      >
        {value}
      </h2>

    </div>

  );
}