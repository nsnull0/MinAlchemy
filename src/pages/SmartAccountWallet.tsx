import Web3ModalProvider from "@/app/context"
import { projectId } from "@/config"
import { AlchemySmartAccountClient, createModularAccountAlchemyClient } from "@alchemy/aa-alchemy"
import { WalletClientSigner, polygon } from "@alchemy/aa-core"
import { useEffect, useState } from "react"
import { createWalletClient, custom } from "viem"
import { useAccount } from "wagmi"
import SimulationSawUI from "./SimulationSAW"


const SmartAccountWalletContent = () => {
    const { isConnected, address } = useAccount()
    const [connectedAddress, setConnectedAddress] = useState("")
    const [mClient, setMClient] = useState<AlchemySmartAccountClient>()
    

    const [loadingMessage, setLoadingMessage] = useState("")

    const apikey = process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_KEY
    const idx = projectId

    const loadSmartAccount = async () => {
        try {
            const client = createWalletClient({
                chain: polygon,
                transport: custom(window.ethereum)
            })
            const eoaSigner = new WalletClientSigner(
                client,
                "json-rpc"
            );
            const smartAccountClient = await createModularAccountAlchemyClient({
                apiKey: apikey,
                chain: polygon,
                signer: eoaSigner
            })
            setConnectedAddress(smartAccountClient.account.address)
            setMClient(smartAccountClient)
            setLoadingMessage("")
        } catch (error) {
            setLoadingMessage("")
        }
    }

    useEffect(()=> {
        if (isConnected && address) {
            loadSmartAccount()
        }  else {
            setConnectedAddress("")
            setMClient(undefined)
        }
    }, [isConnected, address])

    return (
        <>
            <div>{apikey}</div>
            <div>{idx}</div>
            <div>
                <w3m-button />
            </div>
            <div className={`${loadingMessage.length > 0 ? "" : "hidden"}`}> {loadingMessage}</div>
            <>Smart Account Wallet: {connectedAddress}</>
            <SimulationSawUI mclient={mClient}/>
        </>
    )
}

const SmartAccountWalletUI = () => {
    return (
        <Web3ModalProvider>
            <SmartAccountWalletContent />
        </Web3ModalProvider>
    )
}

export default SmartAccountWalletUI
