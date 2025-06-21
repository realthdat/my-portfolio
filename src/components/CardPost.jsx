import React from "react";

const CardPost = ({ data }) => {
    const { id, title, summary, link, Img } = data;

    const handleClick = (e) => {
        if (!link) {
            e.preventDefault();
            alert("Post link is not available");
        }
    };

    return (
        <div className="group relative w-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                <div className="relative p-5 z-10">
                    {Img && (
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={Img}
                                alt={title}
                                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}

                    <div className="mt-4 space-y-3">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            {title}
                        </h3>

                        <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3">
                            {summary}
                        </p>

                        <div className="pt-4 flex items-center justify-start">
                            {link ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleClick}
                                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                    <span className="text-sm font-medium">Read More</span>
                                </a>
                            ) : (
                                <span className="text-gray-500 text-sm">Link Not Available</span>
                            )}
                        </div>
                    </div>

                    <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
                </div>
            </div>
        </div>
    );
};

export default CardPost;
