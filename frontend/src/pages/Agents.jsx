import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Agents = () => {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('http://localhost:8080/agents')
        // console.log(res.data);
        
        if (res.data.success) {
          setAgents(res.data.data)
        }
      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchAgents()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">All Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent._id}
            className="bg-white p-4 rounded shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
            <p>Email: {agent.email}</p>
            <p>Mobile: {agent.mobile}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Agents
