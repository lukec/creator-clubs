#!/usr/bin/env python3
"""Regression tests for the strict Motion Lab physical-Demo marker gate."""

import unittest

from club_lab import demo_marker_summary


class DemoMarkerSummaryTests(unittest.TestCase):
    def test_full_sequence_with_wrap_has_no_missing_markers(self) -> None:
        expected = [6000 + page * 100 + effect for page in range(5) for effect in range(8)]
        text = "\n".join(str(marker) for marker in [*expected, 6000])
        result = demo_marker_summary(text, 5, 8, 6000)

        self.assertEqual(result[0], expected)
        self.assertEqual(result[1], expected)
        self.assertEqual(result[2], [])
        self.assertTrue(result[3])
        self.assertTrue(result[4])

    def test_wrap_and_final_marker_do_not_excuse_missing_eight(self) -> None:
        expected = [6000 + page * 100 + effect for page in range(4) for effect in range(8)]
        missing_eights = {6007, 6107, 6207}
        text = "\n".join(str(marker) for marker in [*(marker for marker in expected if marker not in missing_eights), 6000])
        _, observed, missing, wrapped, reached_last = demo_marker_summary(text, 4, 8, 6000)

        self.assertEqual(len(observed), 29)
        self.assertEqual(missing, [6007, 6107, 6207])
        self.assertTrue(wrapped)
        self.assertTrue(reached_last)


if __name__ == "__main__":
    unittest.main()
