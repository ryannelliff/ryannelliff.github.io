export default function QAInfographic() {
    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-3 gap-8">
                    {/* Logo/Icon placeholder */}
                    <div className="flex items-center justify-center">
                        <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-primary">×</span>
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="col-span-2">
                        <h2 className="text-4xl font-bold text-black mb-6">ABOUT</h2>
                        <div className="border-2 border-black p-8 bg-white">
                            <p className="text-black text-base leading-relaxed">
                                A Kansas City-based designer with a mind for visual storytelling, social media marketing, and brand creation. With years of experience in design and creative direction, I help brands tell their stories through compelling visuals and strategic design.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}