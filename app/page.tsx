export default function Page() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#F5F5F5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: '16px 24px',
        background: '#1A1556',
        color: '#fff',
        fontWeight: 600,
        letterSpacing: '0.05em'
      }}>
        Deaf College
      </div>

      {/* Content */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#1A1556',
          marginBottom: '10px'
        }}>
          Deaf College
        </h1>

        <p style={{
          color: '#555',
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          Admin Portal Placeholder
        </p>

        <a
          href="/admin" // change if needed
          style={{
            padding: '10px 20px',
            background: '#998426',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            marginRight: '12px'
          }}
        >
          Go to Admin
        </a>
        <a
          href="/faculties" // change if needed
          style={{
            padding: '10px 20px',
            background: '#998426',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            marginRight: '12px'
          }}
        >
          Go to Faculties
        </a>
        <a
          href="/events"
          style={{
            padding: '10px 20px',
            background: '#998426',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            marginRight: '12px'
          }}
        >
          Go to Events
        </a>
        <a
          href="/code-of-conduct" // change if needed
          style={{
            padding: '10px 20px',
            background: '#998426',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            marginRight: '12px'
          }}
        >
          Go to Code of Conduct
        </a>
        <a
          href="/student-portal" // change if needed
          style={{
            padding: '10px 20px',
            background: '#998426',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            marginRight: '12px'
          }}
        >
          Go to Portal
        </a>
        <a
          href="/login" // change if needed
          style={{
            padding: '10px 20px',
            background: '#998426',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Go to Login
        </a>
      </div>

    </main>
  );
}