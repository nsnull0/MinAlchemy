

import { AlchemySmartAccountClient } from "@alchemy/aa-alchemy"
import { useEffect, useState } from "react"
import { Address, parseEther, toHex } from "viem"

type inputProp = {
    mclient: AlchemySmartAccountClient | undefined
}

const SimulationSawUI = ({ mclient }: inputProp) => {


    const [loadingMessage, setLoadingMessage] = useState("")
    const [content, setContent] = useState("")

    const loadSimulation = async () => {
        if (mclient?.account) {
            setLoadingMessage("Loading Simulation")
            try {
                const myAddress = `0x657a0fe8290eBABC6Ae37A2d06471e9b4a429D7a` as Address
                const uoBatches = [
                    {
                        target: myAddress,
                        data: toHex("0x"),
                        value: parseEther("0.01")
                    }
                ]
                const simulationUO = await mclient.simulateUserOperation({
                    uo: uoBatches,
                    account: mclient.account
                })
                const _toString = JSON.stringify(simulationUO)
                setContent(_toString)
                setLoadingMessage("")
            } catch (error) {
                setLoadingMessage("")
            }
        } else {
            setContent("account still null")
        }

    }

    return (
        <>
            <button className="border p-4 border-indigo-300" onClick={loadSimulation}> Simulate Approve </button>
            <div className={`${loadingMessage.length > 0 ? "" : "hidden"}`}> {loadingMessage}</div>
            Simulation Result: <div className="break-all mx-24 border border-emerald-500">{content}</div>
        </>
    )
}

export default SimulationSawUI
