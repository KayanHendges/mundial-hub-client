export default function seletor(option) {
    if(option == 0) {
        setOption0({
            color: "var(--white-text)",
            underlineColor: "2px solid var(--white-text)",
            underlinePadding: "0.5rem",
            display: "flex"
        })
        setOption1({
            color: "var(--complementar-text)",
            underlineColor: "none",
            underlinePadding: "0.7rem",
            display: "none"
        })
    }
    if(option == 1) {
        setOption0({
            color: "var(--complementar-text)",
            underlineColor: "none",
            underlinePadding: "0.7rem",
            display: "none"
        })
        setOption1({
            color: "var(--white-text)",
            underlineColor: "2px solid var(--white-text)",
            underlinePadding: "0.5rem",
            display: "flex"                
        })
    }
}