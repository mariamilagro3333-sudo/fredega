
'use client';

// This component is used as a scroll target to account for the fixed header height.
export function ScrollAnchor({ id }: { id: string }) {
  return <div id={id} className="relative -top-24" />;
}
