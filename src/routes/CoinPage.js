import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from "react-icons/fa";
import axios from "axios";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const CoinPage = () => {
    const [coin, setCoin] = useState({});
    const params = useParams();

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?sparkline=true`;

    useEffect(() => {
        axios.get(url).then((res) => {
            setCoin(res.data);
            console.log(res.data);
        });
    }, [url]);

    return (
        <div className="rounded-div my-12 py-8">
            {/* Image */}
            <div className="flex py-8">
                <img className="w-20 mr-8" src={coin.image?.large} alt="/" />
                <div>
                    <p className="text-3xl font-bold">{coin?.name} price</p>
                    <p>({coin.symbol?.toUpperCase()} / USD)</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left */}
                <div>
                    <div>
                        <div className="flex items-center">
                            {coin.market_data?.current_price ? <p className="text-3xl font-bold">${coin.market_data.current_price.usd.toLocaleString()}</p> : null}
                            <p className="ml-4">7 Day</p>
                        </div>
                        <div>
                            <Sparklines data={coin.market_data?.sparkline_7d.price}>
                                <SparklinesLine color="teal" />
                            </Sparklines>
                        </div>
                    </div>

                    <div className="flex justify-between py-4">
                        <div>
                            <p className="text-gray-500 text-sm">Market Cap</p>
                            {coin.market_data?.market_cap ? <p>{coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Volume (24h)</p>
                            {coin.market_data?.market_cap ? <p>{coin.market_data.total_volume.usd.toLocaleString()}</p> : null}
                        </div>
                    </div>

                    <div className="flex justify-between py-4">
                        <div>
                            <p className="text-gray-500 text-sm">24h High</p>
                            {coin.market_data?.high_24h ? <p>{coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">24h Low</p>
                            {coin.market_data?.low_24h ? <p>{coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div>
                    <p className="text-xl font-bold">Market Stats</p>

                    <div className="flex justify-between items-center py-4">
                        <div>
                            <p className="text-gray-500 text-sm">Market Rank</p>
                            {coin.market_cap_rank}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Hasing Algorithm</p>
                            {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Trust Score</p>
                            {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-4">
                        <div>
                            <p className="text-gray-500 text-sm">Price Change (24h)</p>
                            {coin.market_data ? <p>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</p> : null}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Price Change (7d)</p>
                            {coin.market_data ? <p>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</p> : null}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Price Change (14d)</p>
                            {coin.market_data ? <p>{coin.market_data.price_change_percentage_14d.toFixed(2)}%</p> : null}
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-4">
                        <div>
                            <p className="text-gray-500 text-sm">Price Change (30d)</p>
                            {coin.market_data ? <p>{coin.market_data.price_change_percentage_30d.toFixed(2)}%</p> : null}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Price Change (60d)</p>
                            {coin.market_data ? <p>{coin.market_data.price_change_percentage_60d.toFixed(2)}%</p> : null}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Price Change (1Y)</p>
                            {coin.market_data ? <p>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</p> : null}
                        </div>
                    </div>

                    <div className="flex justify-around p-8 text-center">
                        <FaTwitter size={23} />
                        <FaFacebook size={23} />
                        <FaReddit size={23} />
                        <FaGithub size={23} />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="py-4">
                <p className="text-xl font-bold">About {coin.name}</p>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coin.description ? coin.description.en : "") }}></p>
            </div>
        </div>
    );
};

export default CoinPage;
