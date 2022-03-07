import React from "react";

const Footer = () => {
	return (
		<footer>
			<ul>
				<li>
					<a href="http://" onClick={(e) => e.preventDefault()}>
						Mentions légales
					</a>
				</li>
				<li>
					<a href="http://" onClick={(e) => e.preventDefault()}>
						RGPD
					</a>
				</li>
			</ul>
			<div className="footer-logo-container">
				<img
					src="../images/icon-left-font-monochrome-white.png"
					alt="Logo de l'entreprise"
				/>
			</div>
		</footer>
	);
};

export default Footer;
