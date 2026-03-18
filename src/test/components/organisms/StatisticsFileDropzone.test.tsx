import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { StatisticsFileDropzone } from "@/app/statistics/components/StatisticsFileDropzone";
import {
  STATS_CLICK_TO_SELECT_FILE,
  STATS_DRAG_DROP_ACTIVE_SINGLE,
  STATS_DROP_INVALID_FILES,
} from "@/constants/constants";

describe("StatisticsFileDropzone", () => {
  it("renders click-to-select hint", () => {
    const { container } = render(
      <StatisticsFileDropzone
        label="Experimento 1 (CSV)"
        files={[]}
        inputId="file-dropzone"
        onChange={() => {}}
      />,
    );

    expect(
      within(container).getByText(STATS_CLICK_TO_SELECT_FILE),
    ).toBeTruthy();
  });

  it("accepts CSV on drop and calls onChange", () => {
    let receivedFiles: File[] = [];

    const { container } = render(
      <StatisticsFileDropzone
        label="Experimento 1 (CSV)"
        files={[]}
        inputId="file-dropzone"
        onChange={(files) => {
          receivedFiles = files;
        }}
      />,
    );

    const dropzone = within(container).getByRole("button", {
      name: "Experimento 1 (CSV)",
    });

    const csvFile = new File(["A,B\n1,2"], "sample.csv", {
      type: "text/csv",
    });

    fireEvent.dragOver(dropzone);
    expect(
      within(container).getByText(STATS_DRAG_DROP_ACTIVE_SINGLE),
    ).toBeTruthy();

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [csvFile],
      },
    });

    expect(receivedFiles.length).toBe(1);
    expect(receivedFiles[0]?.name).toBe("sample.csv");
  });

  it("rejects non-csv file drops with a clear message", () => {
    let receivedFiles: File[] = [];

    const { container } = render(
      <StatisticsFileDropzone
        label="Experimento 1 (CSV)"
        files={[]}
        inputId="file-dropzone"
        onChange={(files) => {
          receivedFiles = files;
        }}
      />,
    );

    const dropzone = within(container).getByRole("button", {
      name: "Experimento 1 (CSV)",
    });

    const txtFile = new File(["invalid"], "notes.txt", {
      type: "text/plain",
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [txtFile],
      },
    });

    expect(receivedFiles.length).toBe(0);
    expect(within(container).getByText(STATS_DROP_INVALID_FILES)).toBeTruthy();
  });
});
