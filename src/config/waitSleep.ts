const waitSleep = async (time: number) => await new Promise((ok) => setTimeout(ok, time))
export default waitSleep
