import LiveMatchesList from "./LiveMatchesList";
// import "./index.css"

const LiveMatches = ()=>{
    return(
        <div className="live-matches-container">
            <h1 className="text-xl font-bold underline mb-2">Live Matches</h1>
            <div className="overflow-x-auto	whitespace-nowrap py-2">
                <LiveMatchesList/>
            </div>
        </div>
    )
}

export default LiveMatches;