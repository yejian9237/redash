import React from "react";
import PropTypes from "prop-types";
import Link from "@/components/Link";
import BigMessage from "@/components/BigMessage";
import NoTaggedObjectsFound from "@/components/NoTaggedObjectsFound";
import EmptyState, { EmptyStateHelpMessage } from "@/components/empty-state/EmptyState";
import DynamicComponent from "@/components/DynamicComponent";

export default function QueriesListEmptyState({ page, searchTerm, selectedTags }) {
  if (searchTerm !== "") {
    return <BigMessage message="没有查询到任何记录。" icon="fa-search" />;
  }
  if (selectedTags.length > 0) {
    return <NoTaggedObjectsFound objectType="queries" tags={selectedTags} />;
  }
  switch (page) {
    case "favorites":
      return <BigMessage message="显示我关注的查询。" icon="fa-star" />;
    case "archive":
      return <BigMessage message="显示归档的查询。" icon="fa-archive" />;
    case "my":
      return (
        <div className="tiled bg-white p-15">
          <Link.Button href="queries/new" type="primary" size="small">
            新建查询
          </Link.Button>{" "}
          显示我的查询，若需帮助{" "}{" "}
          <Link href="https://redash.io/help/user-guide/querying/writing-queries">查看帮助</Link>.
        </div>
      );
    default:
      return (
        <DynamicComponent name="QueriesList.EmptyState">
          <EmptyState
            icon="fa fa-code"
            illustration="query"
            description="从数据源获取数据。"
            helpMessage={<EmptyStateHelpMessage helpTriggerType="QUERIES" />}
          />
        </DynamicComponent>
      );
  }
}

QueriesListEmptyState.propTypes = {
  page: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedTags: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
