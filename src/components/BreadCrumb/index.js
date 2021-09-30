import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// styles
import { Wrapper, Content } from "./BreadCrumb.style";

const BreadCrumb = ({ movietitle }) => (
	<Wrapper>
		<Content>
			<Link to="/">
				<span>Home</span>
			</Link>
			<span>|</span>
			<span>{movietitle}</span>
		</Content>
	</Wrapper>
);

BreadCrumb.propTypes = {
	movietitle: PropTypes.string,
};

export default BreadCrumb;
