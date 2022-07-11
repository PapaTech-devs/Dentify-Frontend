import { useAuth } from "./hooks/contextHooks";

function App() {
  const { authUser, signMeOut, signIn, loading } = useAuth();

  if (loading) return <p>Loading</p>;
  else {
    return (
      <div>
        {authUser ? (
          <>
            <p>User logged in</p>
            <button
              className="w-16 h-12 bg-red-500"
              onClick={() => signMeOut()}
            >
              SignOut
            </button>
          </>
        ) : (
          <>
            <p>User logged out</p>
            <button
              className="w-16 h-12 bg-green-500"
              onClick={() => signIn("test@gmail.com", "test1234")}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    );
  }
}

export default App;
