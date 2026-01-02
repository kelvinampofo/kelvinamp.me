import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Git Notes",
  description: "Quick notes on Git for reference.",
  publishedDate: "2024-03-06",
};

export default function GitNotes() {
  return (
    <>
      <Heading>Git Notes</Heading>
      <p>Quick notes for reference.</p>
      <ul>
        <li>
          <code>git maintenance start</code> – starts maintenance on a specific
          repository and speeds up other git commands by optimising repository
          data.
        </li>
        <li>
          <code>git config --global branch.sort -committerdate</code> – I never
          liked that git branches are not sorted by the last commit time first.
          This fixes the problem.
        </li>
        <li>
          <code>git config --global column.ui auto</code> – git branches are laid
          out in a list by default. I prefer them to be displayed in columns
          graphically.
        </li>
        <li>
          <code>git push --force-with-lease</code> – safer than{" "}
          <code>--force</code>.
          <ul>
            <li>
              aborts if the remote branch has moved, shielding teammates from{" "}
              <em>accidental</em> overwrites.
            </li>
          </ul>
        </li>
        <li>
          <code>git log -L &lt;start,end&gt;:&lt;file&gt;</code> – trace the
          history of just a slice of a file—ideal for watching how a function or
          block evolved.
        </li>
        <li>
          <code>git commit --fixup &lt;SHA&gt;</code> – prepare a helper commit
          that Git will auto‑squash during a rebase; perfect for tidying up
          changes after code‑review feedback.
        </li>
      </ul>
    </>
  );
}
