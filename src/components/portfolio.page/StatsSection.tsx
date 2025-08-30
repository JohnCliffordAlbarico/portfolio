
"use client";
const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '3+', label: 'Years Experience' },
            { number: '25+', label: 'Happy Clients' },
            { number: '100%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;