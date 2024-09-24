// /*!

// =========================================================
// * Argon Dashboard React - v1.2.4
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
// * Copyright 2024 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import { Link } from "react-router-dom";
// // reactstrap components
// import {
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   Form,
//   FormGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Input,
//   InputGroup,
//   Navbar,
//   Nav,
//   Container,
//   Media,
// } from "reactstrap";

// const AdminNavbar = () => {
//   return (
//     <>
//       <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
//         <Container fluid>
        
        
//           <Nav className="align-items-center d-none d-md-flex" navbar>
//           <Link to={'/admin/user-profile'}>
//           <span className="avatar avatar-sm rounded-circle">
//                     <img
//                       alt="..."
//                       src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                     />
                    
//                   </span>
//           </Link>
//             <UncontrolledDropdown nav>
//               <DropdownToggle className="pr-0" nav>
//                   <Media className="ml-2 d-none d-lg-block">
//                     <span className="mb-0 text-sm font-weight-bold">
//                       Jessica Jones
//                     </span>
//                     <i className="ni ni-bold-down p-2" />
//                   </Media>
//               </DropdownToggle>
//               <DropdownMenu className="dropdown-menu-arrow" right>
//                 <DropdownItem className="noti-title" header tag="div">
//                   <h6 className="text-overflow m-0">Welcome!</h6>
//                 </DropdownItem>
//                 <DropdownItem to="/admin/user-profile" tag={Link}>
//                   <i className="ni ni-single-02" />
//                   <span>My profile</span>
//                 </DropdownItem>
//                 <DropdownItem to="/admin/user-profile" tag={Link}>
//                   <i className="ni ni-lock-circle-open" />
//                   <span>Change Password</span>
//                 </DropdownItem>
                
//                 <DropdownItem divider />
//                 <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
//                   <i className="ni ni-user-run" />
//                   <span>Logout</span>
//                 </DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default AdminNavbar;
