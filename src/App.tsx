import { useAccount, useAccountEffect, useConnect, useDisconnect, useSwitchChain } from 'wagmi'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  useAccountEffect({
    onConnect(data) {
        console.log(data.chain?.rpcUrls);
    },
  })
  const { chains, switchChain } = useSwitchChain()
  
  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        <div>
      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id as 1 | 11155111 | 56 })}>
          {chain.name}
        </button>
      ))}
    </div>
      </div>
    </>
  )
}

export default App
