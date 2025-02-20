import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  logoPath: string = "/icons/logo.svg";
  user: firebase.User | null = null;
  dropdownOpen: boolean = false;
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }

  loginWithGitHub() {
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log('Dropdown Open:', this.dropdownOpen);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.profileContainer && !this.profileContainer.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
