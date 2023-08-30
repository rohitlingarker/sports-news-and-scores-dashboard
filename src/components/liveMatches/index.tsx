import LiveMatchesList from "./LiveMatchesList";
// import "./index.css"

const LiveMatches = ()=>{
    return(
        <div className="live-matches-container">
            <h1 className="text-3xl font-bold underline">Live Matches</h1>
            <div className="overflow-x-scroll flex">
                <LiveMatchesList/>
            </div>
        </div>
    )
}

export default LiveMatches;