import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="landing-page">

        {/* Hero Section */}
        <section className="landing-hero">
          <div className="landing-container">

            <p className="landing-label">
              WELCOME TO PUBLISHLY
            </p>

            <h1>
              Write your ideas.
              <br />
              Share your story.
            </h1>

            <p className="landing-description">
              Publishly is a place where you can write,
              publish, and discover ideas from people
              around the community.
            </p>

            <div className="landing-actions">
              <Link
                to="/register"
                className="btn btn-primary"
              >
                Start Writing
              </Link>

              <Link
                to="/feed"
                className="btn btn-secondary"
              >
                Explore Posts
              </Link>
            </div>

          </div>
        </section>


        {/* Features Section */}
        <section className="landing-features">
          <div className="landing-container">

            <h2>
              Why Publishly?
            </h2>

            <div className="feature-grid">

              <div className="feature-card">
                <h3>Write</h3>

                <p>
                  Turn your thoughts, experiences,
                  and ideas into meaningful posts.
                </p>
              </div>


              <div className="feature-card">
                <h3>Publish</h3>

                <p>
                  Share your writing publicly or
                  keep your personal thoughts private.
                </p>
              </div>


              <div className="feature-card">
                <h3>Discover</h3>

                <p>
                  Explore interesting posts and
                  discover ideas from other writers.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* Bottom CTA */}
        <section className="landing-cta">
          <div className="landing-container">

            <h2>
              Have something to say?
            </h2>

            <p>
              Start writing and share it with the community.
            </p>

            <Link
              to="/register"
              className="btn btn-primary"
            >
              Create Your Account
            </Link>

          </div>
        </section>

      </main>
    </>
  );
};

export default Home;