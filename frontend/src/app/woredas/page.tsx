export default function WoredasPage() {
  const woredas = [
    { name: 'Worabe', slug: 'worabe', description: 'Capital city of Silte Zone' },
    { name: 'Hulbarag', slug: 'hulbarag', description: 'Hulbarag Woreda' },
    { name: 'Sankura', slug: 'sankura', description: 'Sankura Woreda' },
    { name: 'Alicho', slug: 'alicho', description: 'Alicho Woreda' },
    { name: 'Silti', slug: 'silti', description: 'Silti Woreda' },
    { name: 'Dalocha', slug: 'dalocha', description: 'Dalocha Woreda' },
    { name: 'Lanforo', slug: 'lanforo', description: 'Lanforo Woreda' },
    { name: 'East Azernet Berbere', slug: 'east-azernet-berbere', description: 'East Azernet Berbere Woreda' },
    { name: 'West Azernet Berbere', slug: 'west-azernet-berbere', description: 'West Azernet Berbere Woreda' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Silte Woredas</h1>
        <p className="text-gray-600 mb-8">Explore communities across all Silte woredas</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {woredas.map((woreda) => (
            <a
              key={woreda.slug}
              href={`/woredas/${woreda.slug}`}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{woreda.name}</h3>
              <p className="text-gray-600">{woreda.description}</p>
              <div className="mt-4 text-[#2E7D32] font-medium">Explore →</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
